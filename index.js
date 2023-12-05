let courseInfo = {
    id: 12398,
    name: "Bongo Basics"
}

let assignmentInfo ={
    courseInfo,
    dueAt: "12/07/2025",
    pointsPossible: 100
}

let assingmentGroup = {
    courseInfo,
    courseId: 900293,
    groupWeight: 12,
    assignments: [assignmentInfo]
}

let learnerSubmission = {
    learnerId: 78912,
    assignmentId: 10000045,
    submission: {
        submittedAt: '12/08/2025',
        score: 97
    }
}