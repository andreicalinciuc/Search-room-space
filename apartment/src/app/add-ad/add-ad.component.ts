import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-ad',
  templateUrl: './add-ad.component.html',
  styleUrls: ['./add-ad.component.scss']
})
export class AddAdComponent implements OnInit {
  myForm: FormGroup;

  constructor(private fb: FormBuilder , private cd: ChangeDetectorRef) { }

  ngOnInit() {
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
      file: [null, Validators.required]

    });
    this.myForm.valueChanges.subscribe(console.log);
  }

  onFileChange(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.myForm.patchValue({
          file: reader.result
        });

        // need to run CD since file load runs outside of zone
        this.cd.markForCheck();

      };
    }
  }

}
