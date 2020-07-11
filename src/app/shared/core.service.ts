import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoreService {
  public qualifications: String[] = ['M.Sc', 'B.Sc', 'B.E', 'B.Tech']
  constructor() { }
}
