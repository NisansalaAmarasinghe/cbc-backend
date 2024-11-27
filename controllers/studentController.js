import Student from "../models/student.js";

export function getStudents(req,res){

    //to data retrieve
    Student.find().then(
        (studentList)=>{[
            res.json({
                list: studentList
            })
        ]}
    )
}

export function createStudent(req,res){

    //to save students
    const student = new Student(req.body)
    student.save().then(()=>{
        res.json({
            message: "Student created"
        })  
    }).catch(()=>{
        res.json({
            message: "Student Not created"
        })
    })

}

export function deleteStudent(req,res){

    Student.deleteOne({name: req.body.name}).then(
        ()=>{
            res.json(
                {
                    message : "Student deleted successfully"
                }     
            )

        }
            
    )
}