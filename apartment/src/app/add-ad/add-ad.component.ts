import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-ad',
  templateUrl: './add-ad.component.html',
  styleUrls: ['./add-ad.component.scss']
})
export class AddAdComponent implements OnInit {
  myForm: FormGroup;
  images: string[];
  fileControl: FormControl;

  constructor(private fb: FormBuilder, private cd: ChangeDetectorRef, private route: Router) { }

  ngOnInit() {
    this.fileControl = new FormControl([]);
    this.myForm = this.fb.group({
      name: '',
      prenume: '',
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      phone: '',
      title: ['', [
        Validators.maxLength(150)
      ]],
      description: ['', [
        Validators.maxLength(500)
      ]],
      rooms: '',
      address: '',
      price: '',
      file: [this.fileControl]

    });
    this.myForm.valueChanges.subscribe(console.log);
  }

  onFileChange(event) {
    this.images = event.target.files;
    console.log(event.target.files.length);
    if (event.target.files && event.target.files.length >= 2) {
      const files = event.target.files;
      const filesBase64 = [];
      for (const file of files) {
        const reader = new FileReader();
        reader.onload = () => {
          filesBase64.push(reader.result);
        };
        reader.readAsDataURL(file);

      }

      this.fileControl.setValue(filesBase64);

      // need to run CD since file load runs outside of zone
      this.cd.markForCheck();
      document.getElementById('validation').innerHTML = '';
    } else {
      document.getElementById('validation').innerHTML = 'Please enter at least 2 pictures';
      document.getElementById('validation').style.color = 'red';
    }
  }
  OnSubmit(myForm) {
    
    this.route.navigate(['']);
  }
}

