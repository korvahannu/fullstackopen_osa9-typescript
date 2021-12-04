import React from 'react';

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartBaseDescriptive extends CoursePartBase {
  description: string;
}


interface CourseNormalPart extends CoursePartBaseDescriptive {
  type: "normal";
}

interface CourseProjectPart extends CoursePartBase {
  type:"groupProject";
  groupProjectCount:number;
}

interface CourseSubmissionPart extends CoursePartBaseDescriptive {
  type: "submission";
  exerciseSubmissionLink: string;
}

interface CourseSpecial extends CoursePartBaseDescriptive {
  type: "special";
  requirements:string[];
}

type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecial;

const courseParts: CoursePart[] = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is the leisured course part",
    type: "normal"
  },
  {
    name: "Advanced",
    exerciseCount: 7,
    description: "This is the harded course part",
    type: "normal"
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3,
    type: "groupProject"
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
    type: "submission"
  },
  {
    name: "Backend development",
    exerciseCount: 21,
    description: "Typing the backend",
    requirements: ["nodejs", "jest"],
    type: "special"
  }
]

const Header = ({header}:{header:string}) => <h1>{header}</h1>;

const Content = ({courseParts}:{courseParts:CoursePart[]}) => {


  const element = courseParts.map(part => {
    switch(part.type) {
      case "normal":
        return <p key={part.name}><b>{part.name}</b> <i>{part.description}</i> --- Exercises: {part.exerciseCount}</p>
      case "groupProject":
        return <p key={part.name}><b>{part.name}</b> --- Exercises:{part.exerciseCount} Group exercises: {part.groupProjectCount}</p>
      case "submission":
        return <p key={part.name}><b>{part.name}</b> <i>{part.description}</i> --- Exercises: {part.exerciseCount} SEE MORE@{part.exerciseSubmissionLink}</p>
      case "special":
        return <p key={part.name}><b>{part.name}</b> <i>{part.description}</i> --- Exercises: {part.exerciseCount}. <b>REQUIREMENTS: {part.requirements.map(r => <i key={r}>-{r}-</i>)}</b></p>
      default:
        return assertNever(part);
    }
  });

  return <div>{element}</div>;
};

const Total = ({courseParts}:{courseParts:CoursePart[]}) => {

  const count = courseParts.reduce((carry, part) => carry + part.exerciseCount, 0);

  return <p>Number of exercises {count}</p>
};

const assertNever = (value:never) : never => {
  throw new Error('Unhandled union member: ' + JSON.stringify(value));
};

const App = () => {
  const courseName = "Half Stack application development";

  return (
    <div>
      <Header header={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts}/>
    </div>
  );
};

export default App;