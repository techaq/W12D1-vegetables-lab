const React = require('react')

class Show extends React.Component {
  render () {
    // const { name, color ,readyToEat, img} = this.props.vegetable
    const vegetables = this.props.vegetables
    console.log(vegetables)
    return (
      <div>
        <h1> Show Page </h1>
        <div>
        The {vegetables.name} is {vegetables.color}.
        And {
          vegetables.readyToEat ? 
            "It is ready to eat!"
          :
            "It is not ready to eat... Cant touch this"
        }
        </div>
        <img src={vegetables.img} alt="" />
      </div>
    );
  }
}

module.exports = Show;