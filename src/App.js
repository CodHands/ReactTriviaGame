import React, {Component } from 'react'
import './App.css';
import Quiz from './components/quiz';
import Utilities from './components/utilities'

class App extends Component{

  constructor(props) {
    super(props);
  
    this.state = {
      questionList: [],
      counter: 0,
      questionId: 1,
      question: '',
      answerOptions: [],
      result: 0,
      correct_answer: '',
      isSuccess: false,
      isFailure: false,
      isFinished: false
    };
  }

  componentDidMount(){
    this.fetchQuestions();
  }

  //fetching question list through API
  async fetchQuestions(){
    try {
        let questionList = await fetch(`https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple`)
        let json = await questionList.json();        
        if(json.results.length){
          this.setState({
            questionList: json.results, 
            question: json.results[0].question,
            answerOptions: [...json.results[0].incorrect_answers,json.results[0].correct_answer],
            correct_answer: json.results[0].correct_answer
          })
        }        
    } catch (e){
        throw e
    }
  }

  //handle the selected answers
  handleAnswerSelected = (event)  => {
    var answerOption = document.getElementById(event.currentTarget.value).nextSibling;

    if(this.state.correct_answer.localeCompare(event.currentTarget.value) === 0){  
      answerOption.style.backgroundColor = '#1af59d';
      this.setState({ isSuccess: true, result: this.state.result + 1})          
    } else {
      answerOption.style.backgroundColor = '#a70303d1';
      this.setState({isFailure: true})
    }

    this.checkForNextQuestion(answerOption)
  }

  checkForNextQuestion(answerOption){
    if (this.state.questionId < this.state.questionList.length) {
        setTimeout(() => {
          answerOption.style.backgroundColor = 'transparent';
          this.setNextQuestion()
        }, 1500);
    } else {
      setTimeout(() => 
        this.setState({isSuccess: false,isFailure: false,isFinished: true})
      ,1500)
    }
  }

  //setting up next question
  setNextQuestion() {
    const counter = this.state.counter + 1;
    const questionId = this.state.questionId + 1;
    this.setState({
      isSuccess: false,
      isFailure: false
    });
    this.setQuestionStates(counter,questionId)
  }

  //resetting the quiz to initial state
  resetQuiz = () => {
    const counter = 0;
    const questionId = 1;
    this.setState({
      isFinished: false,
      result: 0
    })
    this.setQuestionStates(counter,questionId)
  }

  setQuestionStates = (counter,questionId) => {
    this.setState({
      counter: counter,
      questionId: questionId,
      question: this.state.questionList[counter].question,
      answerOptions: [...this.state.questionList[counter].incorrect_answers,this.state.questionList[counter].correct_answer],
      correct_answer: this.state.questionList[counter].correct_answer,
    })
  }

  render(){
    const {answerOptions,questionId,question,questionList,correct_answer} = this.state;
    
    return (
      <div className="App">
        {questionList.length? (
          <div>
            <h1>Bank Of Hodlers Quiz</h1>
            { 
              !this.state.isFinished ? 

                <Quiz
                    answerOptions={answerOptions}
                    questionId={questionId}
                    question={question}
                    questionTotal={questionList.length}
                    onAnswerSelected={this.handleAnswerSelected}
                    correct_answer={correct_answer}
                /> : (
                <div>
                  <h2>{this.state.result > 5 ? `Hurray. You scored ${this.state.result} out of ${this.state.questionList.length}.` : `Oops. You scored ${this.state.result} out of ${this.state.questionList.length}.Better Luck next time.` }</h2>
                  <button onClick={this.resetQuiz}>Start Again</button>
                </div>
              )
            }
          
            {/*Utilities Component*/}
            <Utilities 
                isSuccess={this.state.isSuccess}
                isFailure={this.state.isFailure}
            />
          </div>
        ) : (<div className="loader">
              <img src="https://loading.io/spinners/ellipsis/lg.discuss-ellipsis-preloader.gif" alt="loader" width="125"/>
            </div>)
        }
      </div>
    );
  }
}

export default App;
