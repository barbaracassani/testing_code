import React, {FunctionComponent, useEffect, useRef} from 'react';
import {StateType, useGetTickerByLabelQuery} from './ticker.service';
import {RouteComponentProps, useParams} from 'react-router-dom';
import {StyledError, StyledTicker, StyledTickerGroup, StyledTickerSingle} from './ticker.styled';


interface TickerProps extends RouteComponentProps<Record<string, string>, {}> {
}

const Ticker: FunctionComponent<TickerProps> = (props) => {

    const params = useParams() as { label: string }

    const [pollingInterval, setPollingInterval] = React.useState(3000);
    const [bidClass, setBidClass] = React.useState('');
    const [askClass, setAskClass] = React.useState('');

    const {
        data,
        error,
        isLoading,
    } = useGetTickerByLabelQuery(params.label, {
        pollingInterval
    })
    const currentValues = useRef({bid: data?.bid || 0, ask: data?.ask || 0} as StateType);

    useEffect(() => {
        let timeout: number | undefined;
        if (data) {
            ['bid', 'ask'].forEach((s) => {
                if (currentValues.current[s] && data[s]) {
                    if (data[s] > currentValues.current[s]) {
                        s === 'bid' ? setBidClass('up') : setAskClass('up')
                    } else if (data[s] < currentValues.current[s]) {
                        s === 'bid' ? setBidClass('down') : setAskClass('down')
                    }
                }
            })
            currentValues.current = data;
            timeout = window.setTimeout(() => {
                setBidClass('')
                setAskClass('')
            }, 5000)
        }
        return () => {
            window.clearTimeout(timeout)
        }
    }, [data?.bid, data?.ask])

    useEffect(() => {
        setBidClass('')
        setAskClass('')
        currentValues.current = {bid: 0, ask: 0};
    }, [params.label])

    useEffect(() => {
        // suspend polling on unmount. Possibly unnecessary -- no mention in the redux-toolkit docs
        return () => setPollingInterval(0)
    }, [])

    return <StyledTicker>
        <h2>{params.label}</h2>
        {error && <StyledError>Cannot load data!</StyledError>}
        {!error && isLoading ? <div>Loading...</div> :
            <StyledTickerGroup>
                <StyledTickerSingle>Bid: <span className={bidClass}>{data?.bid || '--'}</span></StyledTickerSingle>
                <StyledTickerSingle>Ask: <span className={askClass}>{data?.ask || '--'}</span></StyledTickerSingle>
            </StyledTickerGroup>}
    </StyledTicker>
}
export default Ticker
