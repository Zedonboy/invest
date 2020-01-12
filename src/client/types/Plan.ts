export default class Plan {
    id : number
    interest : number
    duration : string
    min : number
    max : number
    title : string
    constructor(id : number, interest : number, duration : string, min : number, max : number, title : string){
        this.id = id
        this.duration = duration
        this.interest = interest
        this.min = min
        this.max = max
        this.title = title
    }
}