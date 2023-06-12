import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class DateUtils {
    now(): Date {
        return new Date();
    }
}