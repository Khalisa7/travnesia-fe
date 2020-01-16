import React, { Component } from "react"
import { Link } from "react-router-dom"
import "./style/sTable.css";


class CTable extends Component{
    render(){
        return(
            <div>
                <BootstrapTable data={this.props.data}>
                    <TableHeaderColumn isKey dataField='nomor'>
                        Nomor Tagihan
                    </TableHeaderColumn>
                    <TableHeaderColumn isKey dataField='total'>
                        Total Tagihan
                    </TableHeaderColumn>
                    <TableHeaderColumn isKey dataField='status'>
                        Status Tagihan
                    </TableHeaderColumn>
                </BootstrapTable>
            </div>

        );
    }
}

    export default CTable;