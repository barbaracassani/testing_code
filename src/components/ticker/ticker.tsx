import React, {FunctionComponent, useEffect, useRef} from 'react';
import {useGetTickerByLabelQuery} from './ticker.service';
import {RouteComponentProps} from 'react-router-dom';
import {StyledError, StyledTicker, StyledTickerGroup, StyledTickerSingle} from './ticker.styled';


interface TickerProps extends RouteComponentProps<Record<string, string>, {}> {
}

const Ticker: FunctionComponent<TickerProps> = (props) => {

    const label: string = props.match.params.label;

    const [pollingInterval, setPollingInterval] = React.useState(3000);
    const [bidClass, setBidClass] = React.useState('');
    const [askClass, setAskClass] = React.useState('');

    const {
        data,
        error,
        isLoading,
    } = useGetTickerByLabelQuery(label, {
        pollingInterval
    })

    const currentValues = useRef({bid: data?.bid || 0, ask: data?.ask || 0});

    useEffect(() => {
        let timeout: number | undefined;
        if (data) {
            const {bid, ask} = data
            if (currentValues.current.bid && currentValues.current.ask) {
                if (bid) {
                    if (bid > currentValues.current.bid) {
                        setBidClass('up')
                    } else if (bid < currentValues.current.bid) {
                        setBidClass('down')
                    }
                }
                if (ask) {
                    if (ask > currentValues.current.ask) {
                        setBidClass('up')
                    } else if (ask < currentValues.current.ask) {
                        setBidClass('down')
                    }
                }
            }
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
    }, [label])

    useEffect(() => {
        // suspend polling on unmount. Possibly unnecessary -- no mention in the redux-toolkit docs
        return () => setPollingInterval(0)
    }, [])

    return <StyledTicker>
        <h2>{label}</h2>
        {error && <StyledError>Cannot load data!</StyledError>}
        {!error && isLoading ? <div>Loading...</div> :
            <StyledTickerGroup>
                <StyledTickerSingle>Bid: <span className={bidClass}>{data?.bid || '--'}</span></StyledTickerSingle>
                <StyledTickerSingle>Ask: <span className={askClass}>{data?.ask || '--'}</span></StyledTickerSingle>
            </StyledTickerGroup>}
    </StyledTicker>
}
export default Ticker
