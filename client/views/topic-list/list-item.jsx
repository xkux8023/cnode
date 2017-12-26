import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import ListItem from 'material-ui/List/ListItem'
import ListItemAvatar from 'material-ui/List/ListItemAvatar'
import ListItemText from 'material-ui/List/ListItemText'
import { withStyles } from 'material-ui/styles'
import Avatar from 'material-ui/Avatar'
import { tabs } from '../../util/variable-define'

import {
  topicPrimaryStyle,
  topicSecondaryStyle,
} from './styles'

const getTab = (tab, isTop, isGood) => {
  return isTop ? '置顶' : (isGood ? '精华' : tab) // eslint-disable-line
}

const Primary = ({ classes, topic }) => {
  const isTop = topic.top
  const isGood = topic.good
  const classnames = cx([classes.tab, isTop ? classes.top : '', isGood ? classes.good : ''])
  return (
    <div className={classes.root}>
      <span className={classnames}>
        {getTab(tabs[topic.tab], isTop, isGood)}
      </span>
      <span className={classes.title}>{topic.title}</span>
    </div>
  )
}

const StyledPrimary = withStyles(topicPrimaryStyle)(Primary)

const Secondary = ({ classes, topic }) => (
  <span className={classes.root}>
    <span className={classes.userName}>{topic.author.loginname}</span>
    <span className={classes.count}>
      <span className={classes.accentColor}>{topic.reply_count}</span>
      <span>/</span>
      <span>{topic.visit_count}</span>
    </span>
    <span>创建时间：{topic.create_at}</span>
  </span>
)
const StyledSecondary = withStyles(topicSecondaryStyle)(Secondary)

const TopicListItem = ({ onClick, topic }) => (
  <ListItem button onClick={onClick}>
    <ListItemAvatar>
      <Avatar src={topic.author.avatar_url} />
    </ListItemAvatar>
    <ListItemText
      primary={<StyledPrimary topic={topic} />}
      secondary={<StyledSecondary topic={topic} />}
    />
  </ListItem>
)

Primary.propTypes = {
  topic: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
}
Secondary.propTypes = {
  topic: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
}
TopicListItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  topic: PropTypes.object.isRequired,
}


export default TopicListItem
