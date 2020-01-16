import React, {Component} from 'react'
import Dropzone from 'react-dropzone'

class CUserTicketOpen extends Component{
    constructor(props){
        super(props);
        this.state = {
            accepted: [],
            rejected: []
        }
    };

    render(){
        return(
            <div className="user-ticketopen">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card shadow border-0 mb-4">
                            <div className="card-header bg-info">
                                <h5 className="text-white">
                                    Open Ticket Support
                                </h5>
                            </div>
                            <div className="card-body bg-white">
                                <div className="row justify-content-center">
                                    <div className="col-md-8 pb-4">
                                        <div className="form-row">
                                            <div className="form-group col-md-12">
                                                <label htmlFor="">Pilih topik yang ingin di bahas</label>
                                                <small className="form-text text-muted">We'll never share your email with anyone else.</small>
                                                <select name="selectTopics" id="" className="form-control" placeholder="Pilih Topik">
                                                    <option value=""></option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group col-md-12">
                                                <label htmlFor="">Pilih sub topik yang ingin di bahas</label>
                                                <small className="form-text text-muted">We'll never share your email with anyone else.</small>
                                                <select name="selectSubTopics" id="" className="form-control"  placeholder="Pilih Subtopik">
                                                    <option value=""></option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group col-md-12">
                                                <label htmlFor="">Subject</label>
                                                <small className="form-text text-muted">We'll never share your email with anyone else.</small>
                                                <input type="text" name="inputSubject" id="" className="form-control"/>
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group col-md-12">
                                                <label htmlFor="">Your Message</label>
                                                <small className="form-text text-muted">We'll never share your email with anyone else.</small>
                                                <textarea type="text" name="inputMessage" id="" className="form-control" rows="5"/>
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group col-md-12">
                                                <label htmlFor="">Your Attachment Here</label>
                                                <small className="form-text text-muted">We'll never share your email with anyone else.</small>
                                                <Dropzone
                                                    accept="image/jpeg, image/png"
                                                    onDrop={(accepted, rejected) => { this.setState({ accepted, rejected }); }}
                                                    className="bg-light py-4 border-danger rounded"
                                                    style={{height:170+"px",width:100+"%",border:"dashed", float:"right"}}
                                                >
                                                    <div className="text-center">
                                                        <h6>
                                                            Your Attachment Here
                                                        </h6>
                                                        <button className="btn btn-sm btn-outline-primary"><i className="fa fa-cloud fa-fw pr-4"></i> Browse File</button><br/>
                                                        <label htmlFor="">
                                                            {
                                                                this.state.accepted.map(f => {return f.name})
                                                            }
                                                        </label>
                                                    </div>
                                                </Dropzone>
                                            </div>
                                        </div>
                                        <div className="form-row justify-content-center">
                                            <button type="submit" className="btn btn-sm btn-danger px-4 ">Submit</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }    
}

export default CUserTicketOpen