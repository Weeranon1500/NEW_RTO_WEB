import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common'
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable()
export class ExcelService {

  Date:any;
  Time:any;


  constructor(public datepipe: DatePipe) { }

  public exportAsExcelFile(json: any[], excelFileName: string): void {

    this.Date = new Date().toLocaleDateString('en-US');
    this.Time = new Date().getTime();
    let DateConvert1 = this.datepipe.transform(this.Date, 'yyyyMMdd');
    let DateConvert2 = this.datepipe.transform(this.Time, 'HHmm');
    this.Date = DateConvert1;
    this.Time = DateConvert2;

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    console.log('worksheet',worksheet);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    //const excelBuffer: any = XLSX.write(workbook, { bookType: 'XLSX', type: 'buffer' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_' + this.Date + '_' + this.Time + EXCEL_EXTENSION);
  }

}