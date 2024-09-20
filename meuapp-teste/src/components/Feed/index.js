import React,{Component} from "react";

class Feed extends Component {
    render(){
        return (
            <div key={this.props.id}>
                <h3>{this.props.username}</h3>
                {this.props.likes > 1 ? <span>{this.props.likes} Likes </span>:<span>{this.props.likes} Like </span>}
                | {this.props.comments > 1 ?<span>{this.props.likes} Comments </span>:<span>{this.props.likes} Comment </span>}
                <hr/>
            </div>
        )
    }
}

export default Feed;