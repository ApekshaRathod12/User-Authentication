import React from "react";

class ErrorBoundary extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            hasError : null
        }
    }

    static getDerivedStateFromError(error){
        return { hasError : error}
    }

    componentDidCatch(error , info){
        console.log(error);
        console.log(info);
    }

    render(){
        if(this.state.error){
            return (
                <div>Some Error Occurred...</div>
            )
        }
        return this.props.children;
    }
}

export default ErrorBoundary;