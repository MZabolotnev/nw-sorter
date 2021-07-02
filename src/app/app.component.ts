import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit {
  title = 'nw-sorter';
  constructor() {}
  ngOnInit() {
    const win = window.nw.Window.get();
    win.showDevTools();
    // const fs = window.nw.require('fs');
    // const dcraw = window.nw.require('dcraw');
    //
    // const buf = fs.readFileSync('./test-files/test_2.ARW');
    // const tiffFile = dcraw(buf, { exportAsTiff: true });
    // fs.writeFileSync('./test-files/example.tiff', tiffFile)
  }
}
