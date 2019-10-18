 window.$base = new class Base {
   constructor(){
    let data = this.data()
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        this[key] = data[key]
      }
    }
   }
   on(name) {
    console.log(this)
   }
   off() {

   }
   data(){
     return {
       countNumber: 0
     }
   }
   set(name, val) {
    this[name] = val
   }
   get(name) {
     return this[name]
   }
 }