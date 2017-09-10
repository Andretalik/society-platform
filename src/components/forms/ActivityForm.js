import React from 'react';

const ActivityForm = (props) => {

    const activities = props.activities.map(activity => {
        return <option key={activity.uuid} value={activity.uuid}>{activity.name}</option>
    });

    return (
        <form onSubmit={props.addActivity}>
            <table id="activity-form">
                <tbody>
                    <tr>
                        <td>
                            <span className="label">Select the activity</span>
                        </td>
                        <td>
                            <div>
                                <select name="activityId" 
                                    value={props.activityId}
                                    onChange={props.onChange}
                                    required>
                                    <option value={props.name}>Select</option>
                                    {activities}
                                </select>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span className="label">Name of event/activity</span>
                        </td>
                        <td>
                            <div>
                                <input value={props.name}
                                    onChange={props.onChange} 
                                    name="name" 
                                    type="text"
                                    required />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span className="label">Quantity</span>
                        </td>
                        <td>
                            <div>
                                <input value={props.quantity}
                                onChange={props.onChange} name="quantity" type="number" />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span className="label">Add comment</span>
                        </td>
                        <td>
                            <div>
                                <textarea value={props.comment}
                                    onChange={props.onChange} name="comment" type="text" />
                            </div>
                        </td>
                    </tr>

                    <tr>
                        <td colSpan="2" className="form-buttons">
                        <button id="cancel"
                            onClick={props.close}>Cancel</button>
                        <button id="submit"
                            disabled={props.isWorking}>Log</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </form>
    );
}

export default ActivityForm;
