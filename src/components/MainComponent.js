import React, { Component } from 'react';
import Menu from './MenuComponent'
import DishDetail from './DishdetailComponent';
import Header from './HeaderCompoment';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import About from './AboutUsComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Contact from './ContactComoponent';
import { connect } from 'react-redux';


const mapStateToProps = (state) => {
    return {
      dishes: state.dishes,
      leaders: state.leaders,
      promotions: state.promotions,
      comments: state.comments
    }
}

class Main extends Component {

  render() {
    const HomePage = () => {
        return(
            <Home 
            dish={this.props.dishes.filter( (dish) => dish.featured === true )[0]}
            leader={this.props.leaders.filter( (leader) => leader.featured === true )[0]}
            promotion={this.props.promotions.filter( (promo) => promo.featured === true )[0]}
            />
        );  
    }
    const DishWithId = ({match}) => {
      return(
          <DishDetail dish={this.props.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
            comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))} />
      );
    };
    return (
       
      <>
        <Header/>
        <Switch>
            <Route path='/home' component={HomePage}/>
            <Route exact path='/menu' component={() => <Menu dishes={this.props.dishes} />}/>
            <Route path='/menu/:dishId' component={DishWithId} />
            <Route exact path='/contactus' component={Contact}/>
            <Route exact path='/aboutus' component={() => <About leaders = {this.props.leaders}/>}/>
            <Redirect to='/home'/>
        </Switch>
        <Footer/>
      </>
    );
  }
}

export default withRouter (connect (mapStateToProps) (Main));
