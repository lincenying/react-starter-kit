import React from 'react'
import Link from 'react-router/lib/Link'

export default props => {
    const item = props.list
    return <li>11111<Link to={`/article/${item.id}`}>{item.title}</Link></li>
}
