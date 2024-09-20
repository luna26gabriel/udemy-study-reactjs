import React,{Component} from "react";

class Feed extends Component {
    render(){
        return (
            <div key={this.props.id}>
                <h3>{this.props.username}</h3>
                {this.props.likes > 1 ? <a>{this.props.likes} Likes </a>:<a>{this.props.likes} Like </a>}
                | {this.props.comments > 1 ?<a>{this.props.likes} Comments </a>:<a>{this.props.likes} Comment </a>}
                <hr/>
            </div>
        )
    }
}

export default Feed;