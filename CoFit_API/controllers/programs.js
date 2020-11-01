module.exports.index = async (req, res) => {
    await repo.getAllWorkoutPrograms(req, res).then((result) =>{
      const program = result; 
      res.render('./partials/program', {program})  
    }, (err) =>{
  
    });
  };