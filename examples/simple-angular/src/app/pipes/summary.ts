import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
 name: "summary"
})
export class SummaryPipe implements PipeTransform {
 transform(value: string, limit: number = 50){
 if(!value) return "undefined";
 if(value.length < limit) return value;
 return value.substr(0, limit) + "...";
 }
}