let Message = React.createClass({
    getInitialState(){
        return {val:[]}
    },
    handleClick(){
        var val = this.state.val;
        val.push(this.refs.myTxt.value);
        this.refs.myTxt.value='';
        this.setState({val});
    },
    render(){
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h1>珠峰留言版</h1>
                </div>
                <div className="panel-body">
                    <ul className="list-group">
                        {
                            this.state.val.map(function (item, index) {
                                return <li className="list-group-item" key={index}>{item}</li>
                            })
                        }
                    </ul>
                </div>
                <div className="panel-footer">
                    <input type="text"  ref="myTxt" className="form-control"/>
                    <button className="btn btn-primary" onClick={this.handleClick}>留言</button>
                </div>
            </div>
        )
    }
});
ReactDOM.render(<Message/>, document.querySelector('#container'));