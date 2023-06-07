import { Injectable } from "@angular/core";

@Injectable()
export class DateUtils {
    now(): Date {
        return new Date();
    }
}