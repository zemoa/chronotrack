import { Injectable } from "@angular/core";

@Injectable()
export class DateService {
    now(): Date {
        return new Date();
    }
}