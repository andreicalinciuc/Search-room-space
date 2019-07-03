import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-ad',
  templateUrl: './add-ad.component.html',
  styleUrls: ['./add-ad.component.scss']
})
export class AddAdComponent implements OnInit {
  myForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      nume: '',
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
      type: '',
      adress: '',
      price: '',

    });
    this.myForm.valueChanges.subscribe(console.log);
  }

}
