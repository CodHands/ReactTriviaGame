import React, { useState , useEffect, Component } from 'react'
import './App.css';
import Question from './components/question';
import Quiz from './components/quiz';

class App extends Component{

  /* const [questionList, setQuestionList] = useState([]);

  useEffect(() =>{
    fetchQuestions();
  }) */

  constructor(props) {
    super(props);
  
    this.state = {
      questionList: [],
      counter: 0,
      questionId: 1,
      question: '',
      answerOptions: [],
      answer: '',
      answersCount: {
        nintendo: 0,
        microsoft: 0,
        sony: 0
      },
      result: ''
    };
  }

  componentDidMount(){
    this.fetchQuestions();
  }

  async fetchQuestions(){
    try {
        let questionList = await fetch(`https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple`)
        let json = await questionList.json();
        console.log(json);
        
        if(json.results.length){
          this.setState({
            questionList: json.results, 
            question: json.results[0].question,
            answerOptions: [...json.results[0].incorrect_answers,json.results[0].correct_answer]
          })
        }        
    } catch (e){
        throw e
    }
  }

  handleAnswerSelected = (event)  => {
    // this.setUserAnswer(event.currentTarget.value);
    // if (this.state.questionId < this.state.questionList.length) {
    //     setTimeout(() => this.setNextQuestion(), 300);
    //   } else {
    //     // do nothing for now
    // }
  }

  render(){
    console.log(this.state);
    
    return (
      <div className="App">
        <Quiz
          answer={this.state.answer}
          answerOptions={this.state.answerOptions}
          questionId={this.state.questionId}
          question={this.state.question}
          questionTotal={this.state.questionList.length}
          onAnswerSelected={this.handleAnswerSelected}
        />
      </div>
    );
  }
}

export default App;
