import { styles, muiStyles } from '../styles'

import React from 'react'
import { connect } from 'react-redux'
import autobind from 'autobind-decorator'
import { css } from 'aphrodite'
import Person from 'material-ui/svg-icons/social/person'
import Remove from 'material-ui/svg-icons/content/backspace'
import { DropDownMenu, MenuItem, List, ListItem } from 'material-ui'

import { fetchSubjects } from 'actions/subjects'
import { removeAddedCourse, addCourseToGroup } from 'actions/courses'


class InputSection extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      rebuiltSubjects: null,
    }
  }

  @autobind
  handleInput(event, index, value) {
    const { subjectsStore, addCourseToGroup } = this.props

    addCourseToGroup(subjectsStore.data[index]._id)
  }

  @autobind
  removeAddedCourse(subjectId) {
    const { removeAddedCourse, coursesStore } = this.props
    const { initiallyCreatedCourses } = coursesStore

    removeAddedCourse(initiallyCreatedCourses[subjectId], subjectId)
  }

  componentWillMount() {
    const { fetchSubjects } = this.props
    fetchSubjects()
  }

  componentWillReceiveProps(nextProps) {
    const subjects = nextProps.subjectsStore.data
    if(!subjects) return null
    const rebuiltSubjects = {}
    subjects.forEach(subject => { rebuiltSubjects[subject._id] = subject.name })
    this.setState({ rebuiltSubjects })
  }

  render() {
    const subjects = this.props.subjectsStore.data
    const { rebuiltSubjects } = this.state
    const { initiallyCreatedCourses } = this.props.coursesStore

    if(!subjects || !rebuiltSubjects) return (<div>Loading subjects list...</div>) // Waiting for fetch to end

    return(
      <div>
        {
          (subjects.length === Object.keys(initiallyCreatedCourses).length) ? null :
          <div>
            <label htmlFor='new-group-subject'>Pick some subjects:</label><br/>
            <DropDownMenu
              maxHeight={300}
              autoWidth={true}
              value={subjects[0]._id}
              onChange={this.handleInput}
              menuStyle={muiStyles.dropDownMenu}
            >
              {
                subjects.map((subject, i) => {
                  if(!initiallyCreatedCourses[subject._id]) return(
                    <MenuItem
                      value={subject._id}
                      primaryText={subject.name}
                      key={i}
                    ></MenuItem>
                  )
                })
              }
            </DropDownMenu>
          </div>
        }
        <List className={css(styles.subjectsList)}>
          {
            Object.keys(initiallyCreatedCourses).map((subjectId, index) => (
              <ListItem
                key={index}
                primaryText={rebuiltSubjects[subjectId]}
                rightIcon={<Remove />}
                onClick={() => {this.removeAddedCourse(subjectId)}}
              />
            ))
          }
        </List>
      </div>
    )
  }
}

export default connect(store => ({
  subjectsStore: store.subjects,
  coursesStore: store.courses,
}), {
  fetchSubjects,
  addCourseToGroup,
  removeAddedCourse,
})(InputSection)
