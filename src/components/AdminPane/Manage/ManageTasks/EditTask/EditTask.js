import React, { Component } from 'react'
import Form from 'react-jsonschema-form'
import { merge as _merge,
         isObject as _isObject } from 'lodash'
import classNames from 'classnames'
import { FormattedMessage, injectIntl } from 'react-intl'
import { CustomFieldTemplate } from '../../../../Bulma/RJSFFormFieldAdapter/RJSFFormFieldAdapter'
import WithCurrentTask from '../../../HOCs/WithCurrentTask/WithCurrentTask'
import SvgSymbol from '../../../../SvgSymbol/SvgSymbol'
import BusySpinner from '../../../../BusySpinner/BusySpinner'
import { jsSchema, uiSchema } from './EditTaskSchema'
import messages from './Messages'

/**
 * EditTask provies a simple form for creating/editing a Task. We
 * make use of a json-schema standard schema that define the fields and basic
 * validation requirements, and react-jsonschema-forms library to render the
 * form from the schemas. We utilize our own field adapter to massage the form
 * markup and class names into something that is roughly Bulma-compliant.
 *
 * @see See http://json-schema.org/
 * @see See https://github.com/mozilla-services/react-jsonschema-form
 * @see See RJSFFormFieldAdapter
 *
 * @author [Neil Rotstan](https://github.com/nrotstan)
 */
export class EditTask extends Component {
  state = {
    formData: {},
    isSaving: false,
  }

  changeHandler = ({formData}) => this.setState({formData})

  finish = ({formData, errors}) => {
    if (!this.state.isSaving && errors.length === 0) {
      this.setState({isSaving: true})

      this.props.saveTask(formData).then(task => {
        this.props.history.push(
          `/admin/project/${this.props.projectId}/challenge/${this.props.challengeId}`)
      })
    }
  }

  render() {
    const taskData = _merge({}, this.props.task, this.state.formData)

    // Present the geometries as a string rather than object
    if (_isObject(taskData.geometries)) {
      taskData.geometries = JSON.stringify(taskData.geometries)
    }

    return (
      <div className="edit-task">
        <h2 className="title">
          <div className="level">
            {
              _isObject(this.props.task) ?
              <FormattedMessage {...messages.editTask} /> :
              <FormattedMessage {...messages.newTask} />
            }
            {this.props.loading && <BusySpinner inline />}
          </div>
        </h2>

        <Form schema={jsSchema(this.props.intl)}
              uiSchema={uiSchema}
              FieldTemplate={CustomFieldTemplate}
              liveValidate
              noHtml5Validate
              showErrorList={false}
              formData={taskData}
              onChange={this.changeHandler}
              onSubmit={this.finish}>
          <div className="form-controls">
            <button className={classNames("button is-primary is-outlined has-svg-icon",
                                          {"is-loading": this.state.isSaving})}
                    onClick={this.props.finish}>
              <SvgSymbol viewBox='0 0 20 20' sym="check-icon" />
              <FormattedMessage {...messages.save} />
            </button>
          </div>
        </Form>
      </div>
    )
  }
}

export default WithCurrentTask(injectIntl(EditTask))
