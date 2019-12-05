import {Component, OnInit} from '@angular/core';
import * as Papa from 'papaparse';
import {NbDialogService} from "@nebular/theme";
import {ModelFeatureAndParameters} from "./drebin.model";
import {DrebinService} from "./drebin.service";
import {HttpResponse} from "@angular/common/http";

@Component({
    selector: 'app-drebin',
    styleUrls: ['./drebin.component.scss'],
    templateUrl: './drebin.component.html',
})
export class DrebinComponent implements OnInit {

    //,sha256,s1,s2,s3,s4,s5,s6,s7,s8,malware
    grapherEntities_table_settings = {
        hideSubHeader: true,
        mode: 'external',
        add: {
            addButtonContent: '<i class="nb-plus" disabled hidden></i>',
            createButtonContent: '<i class="nb-checkmark" disabled hidden></i>',
            cancelButtonContent: '<i class="nb-close" disabled hidden></i>',
        },
        edit: {
            editButtonContent: '<i class="nb-edit" disabled hidden></i>',
            saveButtonContent: '<i class="nb-checkmark" disabled hidden></i>',
            cancelButtonContent: '<i class="nb-close" disabled hidden></i>',
        },
        delete: {
            deleteButtonContent: '<i class="nb-trash" style="color: #2b2d34" disabled hidden></i>',
            confirmDelete: true,
        },
        columns: {
            sha256: {
                title: 'sha256',
                type: 'string',
            },
            s1: {
                title: 's1',
                type: 'string',
            },
            s2: {
                title: 's2',
                type: 'string',
            },
            s3: {
                title: 's3',
                type: 'string',
            },
            s4: {
                title: 's4',
                type: 'string',
            },
            s5: {
                title: 's5',
                type: 'string',
            },
            s6: {
                title: 's6',
                type: 'string',
            },
            s7: {
                title: 's7',
                type: 'string',
            },
            s8: {
                title: 's8',
                type: 'string',
            },
            malware: {
                title: 'malware',
                type: 'string',
            },
        },
    };
    public file;
    public sourceGrapherEntities = [];
    public accuracy = null;

    modelFeatureAndParameters = new ModelFeatureAndParameters('poly');
    kernelOptions = [
        {id: 0, name: "poly"},
        {id: 1, name: "linear"},
        {id: 2, name: "rbf"},
    ];

    constructor(private dialogService: NbDialogService,
                private  drebinService: DrebinService) {
    }

    ngOnInit() {
    }

    selectChange(t) {
        this.modelFeatureAndParameters.kernel = t.target.value;
    }

    onDeleteGrapherEntities() {
    }

    onEditGrapherEntities() {

    }

    onChange(e) {
        this.file = e.target.files[0];
        Papa.parse(this.file, {
            header: true,
            skipEmptyLines: true,
            complete: (result, file) => {
                this.modelFeatureAndParameters.feature = result.data;
                this.sourceGrapherEntities = this.modelFeatureAndParameters.feature;
            }
        });
    }

    loadingMediumGroup = false;
    upload() {
        if (this.modelFeatureAndParameters.feature != null && this.modelFeatureAndParameters.kernel != '') {
            this.loadingMediumGroup = true;
            this.drebinService.train(this.modelFeatureAndParameters)
                .subscribe((res: HttpResponse<any>) => {
                    console.log(res);
                    this.accuracy = res.body;
                    this.loadingMediumGroup = false;
                }, (res: any) => this.onSaveError());
        } else {
            console.log("Data is not comleted")
        }
    }

    onSaveError(){

    }

}