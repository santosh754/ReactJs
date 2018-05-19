import  React from 'react';

class App extends React.Component{

    constructor(){
        super()
        this.state = {
          userjson:[],
            sortBy: 'id',
            sortDir: null
        };
        this.onSort = this.onSort.bind(this)
    }
    componentDidMount(){
        fetch('http://jsonplaceholder.typicode.com/posts')
            .then(res => res.json())
            .then(res => {
                this.setState({
                    userjson : res
                });
            })
            .catch(error =>{
                console.log(error)
            })
    }

    onSort(cellDataKey) {
        var sortDir = this.state.sortDir;
        var sortBy = cellDataKey;
        if (sortBy === this.state.sortBy) {
            sortDir = this.state.sortDir === 'ASC' ? 'DESC' : 'ASC';
        } else {
            sortDir = 'DESC';
        }
        var rows = this.state.userjson.slice();
        rows.sort((a, b) => {
            var sortVal = 0;
            if (a[sortBy] > b[sortBy]) {
                sortVal = 1;
            }
            if (a[sortBy] < b[sortBy]) {
                sortVal = -1;
            }

            if (sortDir === 'DESC') {
                sortVal = sortVal * -1;
            }
            return sortVal;
        });

        this.setState({sortBy, sortDir, userjson : rows});
    }
    render(){
        return(
            <div>
                No. of rows ={this.state.userjson.length}
                <br/>
                <br/>
                <table border="1">
                    <thead>
                    <tr>
                        <th>
                            <button onClick={()=>this.onSort('userId')}>User_Id</button></th>
                        <th ><button onClick={()=>this.onSort('id')}>Id</button></th>
                        <th><button onClick={()=>this.onSort('title')}>Title</button></th>
                        <th><button onClick={()=>this.onSort('body')}>Body</button></th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.userjson.map(function (p, index) {
                        return(
                            <tr>
                                <td>{p.userId}</td>
                                <td>{p.id}</td>
                                <td>{p.title}</td>
                                <td>{p.body}</td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>

        );
    }
}

export default App;