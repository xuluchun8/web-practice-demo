function FileLoader(file,events){
  this.loaded = 0
  this.file = file 
  this.total = file.size
  this.step = 1024*1024
  this.events = events || {}
  this.reader = new FileReader();
  this.readData(0)
  this.bindEvent()
  
}
FileLoader.prototype = {
  readData : function(start){
    var data ,
        file = this.file
        console.log(file)
    if(file.slice){
      data = file.slice(start,start+this.step)
    }else{
      data = file
    }
    this.reader.readAsText(data)
  },
  bindEvent: function(events){
    this.reader.addEventListener('load',e =>{
      this.onLoad()
    })
    this.reader.addEventListener('progress',e =>{
      this.onprogress(e.loaded)
    })
  },
  onLoad:function(e){
    var hander = this.events.load
    hander && hander(this.reader.result)
    if(this.loaded < this.total){
      this.readData(this.loaded)
    }else{
      this.loaded = this.total
      this.events.success && this.events.success()
    }
  },
  onprogress : function(loaded){
    var percent,
        hander = this.events.progress
        
    this.loaded += loaded
    percent = (this.loaded/this.total)*100
    console.log(percent)
    hander && hander(percent)
    
  }
}
