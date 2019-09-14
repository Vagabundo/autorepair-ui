import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SubmitService } from './services/submit.service';
import { JobSheet } from './models/job-sheet';
import { Job } from './models/job';
import { Constants } from './data/constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private formulario: FormBuilder, private submitSvc: SubmitService) {

  }

  title = 'Autorepair';
  messagesName = 'messages';
  jobsheetName = 'jobsheet';
  validatorError = 'You must generate a job sheet before submit';

  form: FormGroup = this.formulario.group({
    jobsheet: '',
    messages: ''
  });

  jobSheet: JobSheet;

   // It is hard to get a referred or approved example in a random scenario.
   // You can modify the range of the random sgenerationor use one of the following examples

    // Example of referred
  jobSheetReferredExample = { jobs: [ { id: 1, position: 1 }, { id: 1, position: 2 }, { id: 1, position: 3 },
      { id: 1, position: 4 }, {id: 2, position: 1}, {	id: 3, position: 1 }, {	id: 5 } ],
      totalLabourHours: 8.5 ,
      totalCost: 1700.32
    };

    // Example of approved
  jobSheetApprovedExample = { jobs: [ { id: 1, position: 1 }, { id: 1, position: 2 }, { id: 1, position: 3 },
      { id: 1, position: 4 }, {id: 2, position: 1}, {	id: 3, position: 1 }, {	id: 5 } ],
      totalLabourHours: 8.5 ,
      totalCost: 1500.32
    };

  onGenerate() {
    this.jobSheet = this.generateSheet();
    this.form.controls[this.jobsheetName].setValue(JSON.stringify(this.jobSheet));
  }

  onSend() {
    if (this.jobSheet == null) {
      this.form.controls[this.messagesName].setValue(this.validatorError);
    } else {
      this.submitSvc.submitSheet(this.jobSheet)
        .then(answer => {
            this.form.controls[this.messagesName].setValue(answer.messages);
        });
    }
  }

  getRandomInt(min, max: number) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  generateSheet(): JobSheet {
    let jobSheet = new JobSheet();

    jobSheet.jobs = this.generateJobs(this.getRandomInt(0, Constants.MAX_JOBS_PER_SHEET));
    jobSheet.totalLabourHours = this.getRandomInt(1, Constants.MAX_HOURS_PER_SHEET);
    jobSheet.totalCost = this.getRandomInt(1, Constants.MAX_PRICE_PER_SHEET);

    return jobSheet;
  }

  generateJobs(max: number): Job[] {
    let job: Job;
    let jobs: Job[] = [];

    for (let i = 0; i < max; i++) {
      job = new Job();
      job.id = this.getRandomInt(1, Constants.JobCodes.MAX);
      job.position = this.getRandomInt(1, Constants.TyrePosition.MAX);

      jobs.push(job);
    }

    return jobs;
  }
}
