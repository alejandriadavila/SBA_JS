// The provided course information.
const courseInfo = {
  courseId: 451,
  name: "Introduction to JavaScript",
};

// The provided assignment group.
const assignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  courseId: 451,
  groupWeight: 25,
  assignments: [
    {
      id: 1,
      name: "Declare a Variable",
      dueAt: "2023-01-25",
      pointsPossible: 50,
    },
    {
      id: 2,
      name: "Write a Function",
      dueAt: "2023-02-27",
      pointsPossible: 150,
    },
    {
      id: 3,
      name: "Code the World",
      dueAt: "3156-11-15",
      pointsPossible: 500,
    },
  ],
};

// The provided learner submission data.
const learnerSubmissions = [
  {
    learnerId: 125,
    assignmentId: 1,
    submission: {
      submittedAt: "2023-01-25",
      score: 47,
    },
  },
  {
    learnerId: 125,
    assignmentId: 2,
    submission: {
      submittedAt: "2023-02-12",
      score: 150,
    },
  },
  {
    learnerId: 125,
    assignmentId: 3,
    submission: {
      submittedAt: "2023-01-25",
      score: 400,
    },
  },
  {
    learnerId: 132,
    assignmentId: 1,
    submission: {
      submittedAt: "2023-01-24",
      score: 39,
    },
  },
  {
    learnerId: 132,
    assignmentId: 2,
    submission: {
      submittedAt: "2023-03-07",
      score: 140,
    },
  },
];

function getLearnerData(course, ag, submissions) {
  let result = [];

  // Check that courseid matches from course & ag
  if (course.courseId === ag.courseId) {
    // Followed documentation for object.values() found here: https://www.geeksforgeeks.org/how-to-group-objects-in-an-array-based-on-a-common-property-into-an-array-of-arrays-in-javascript/
    const groupByLearnerId = Object.values(
      submissions.reduce((group, current) => {
        group[current.learnerId] = group[current.learnerId] ?? [];
        group[current.learnerId].push(current);
        return group;
      }, {})
    );

      // Add learnerId and avg to result
      for (let i = 0; i < groupByLearnerId.length; i++) {
        let learner = {};
        learner.id = groupByLearnerId[i].learnerId;
        result.push({ id: groupByLearnerId[i][0].learnerId, avg: 0 });
      }
  // calculate grade of each assignment
  let grade = [];
  for (const i in groupByLearnerId) {
    // console.log(groupByLearnerId[i])
    for (const j in groupByLearnerId[i]) {
      // grade.push({assignmentId: groupByLearnerId[i][j].assignmentId})
      // console.log({assignmentId: groupByLearnerId[i][j].assignmentId})
      for (const k in ag.assignments) {
        // console.log(ag.assignments[k]);
        // function isAssignmentIdEqual(object1, object2) {
        //   if(object1.assignmentId === object2.id)
        // console.log(`${object1} === ${object2}???`)
        // return true
        // }
        if (groupByLearnerId[i][j].assignmentId == ag.assignments[k].id) {
          grade.push({
            assignment:
              groupByLearnerId[i][j].submission.score /
              ag.assignments[k].pointsPossible,
          });
        } else {
          continue;
        }
      }
    }
    result.push(grade);

      console.log(result);
      // }else{
      // throw err "Error- Course ID's do not match"
      // }
    }
  }
}
getLearnerData(courseInfo, assignmentGroup, learnerSubmissions);
