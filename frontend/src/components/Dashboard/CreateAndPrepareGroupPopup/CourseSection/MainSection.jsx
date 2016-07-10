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
    console.log(initiallyCreatedCourses)

    if(!subjects || !rebuiltSubjects) return (<div>Loading subjects list...</div>) // Waiting for fetch to end

    return(
      <div>
        {
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
                subjects.length === initiallyCreatedCourses.length ? null :
                  subjects.map((subject, i) => {
                    let subjectAlreadyInUse = false
                    initiallyCreatedCourses.some( course =>
                      course.subject === subject ? subjectAlreadyInUse = true : false
                    )

                    if(!subjectAlreadyInUse) return(
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
            initiallyCreatedCourses.map((course, i) => (
              <ListItem
                key={i}
                primaryText={rebuiltSubjects[course.subject]}
                rightIcon={<Remove />}
                onClick={() => {this.removeAddedCourse(course._id)}}
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
