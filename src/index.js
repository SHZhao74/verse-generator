import PythonShell from 'python-shell'

// const py = PythonShell('./main.py', (err)=>{if (err)throw err;console.log(err);})
const options = {
  mode: 'text',
  args:['你有意見就當面吼']
};

PythonShell.run('src/main.py', options, (err, result) => {
  if (err){
    console.log('QQQQQQQ:',err);
    throw err;
  }
  console.log('result:', result);
});
console.log('123');
