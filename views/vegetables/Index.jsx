const React = require("react");

class Index extends React.Component {
  render() {
    const { vegetables } = this.props;
    return (
      <>
        <h1>Vegetables Index Page!</h1>
        <nav>
          <a href="/vegetables/new">Create a New Vegetable</a>
        </nav>
        <ul>
          {vegetables.map((vegetable, i) => (
            <li key={i}>
              The{" "}
              <a href={`/vegetables/${i}`}>
                {vegetable.name}
              </a>{" "}
              is {vegetable.color} <br />
              {vegetable.readyToEat ? (
                `It is ready to eat`
              ) : (
                `It is not ready to eat`
              )}
              <br />
            </li>
          ))}
        </ul>
      </>
    );
  }
}

module.exports = Index;
