import TodoList from "./TodoList";
import TodoForm from "./TodoForm";
// import TodoForm from "./TodoForm";
const Home = () => {
    return (
        <div className="home">
            <h1> What's Your Plan Today?? </h1>
            <div>
            <TodoForm/>
            <TodoList />
        </div>
        </div>
    )
}
export default Home;


