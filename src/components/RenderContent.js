import { Content } from './Content'

export const RenderContent = (props) => {

    if (!props.dateFrom || !props.dateTo) return 'Pick the range you want to analyze'
    if (props.dateTo < props.dateFrom) return 'Check that dates are in chronological order'
    if (props.submitted === false) return 'Click the button to start the search'
    if (props.loading) return 'Loading...'

    return (
        <Content range={props.range}/>
    )
}