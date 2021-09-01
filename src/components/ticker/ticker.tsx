import React, {FunctionComponent, useEffect} from 'react';
import {useGetTickerByLabelQuery} from './ticker.service';
import {RouteComponentProps} from 'react-router-dom';
import {StyledError, StyledTicker} from './ticker.styled';

interface TickerProps extends RouteComponentProps<Record<string, string>, {}> {
}

const Ticker: FunctionComponent<TickerProps> = (props) => {

    const label: string = props.match.params.label;
    const [pollingInterval, setPollingInterval] = React.useState(3000)

    const {
        data,
        error,
        isLoading,
    } = useGetTickerByLabelQuery(label, {
        pollingInterval
    })

    useEffect(() => {
        // suspend polling on unmount. Possibly unnecessary -- no mention in the redux-toolkit docs
        return () => setPollingInterval(0)
    }, [])

    return <StyledTicker>
        <h2>{label}</h2>
        {error && <StyledError>Cannot load data!</StyledError>}
        {!error && isLoading ? <div>Loading...</div> : <div>Bid: {data?.[0] || '--'} Ask: {data?.[2] || '--'}</div>}
    </StyledTicker>
}
export default Ticker
