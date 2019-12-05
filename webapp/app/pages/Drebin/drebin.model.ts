export class ModelFeatureAndParameters {
    constructor(public kernel?: string,
                public feature?: any[],
    ) {
        // this.id = id ? id : null;
        this.kernel = kernel ? kernel : '';
        this.feature = feature ? feature : [];
    }
}
//
//
//
//
// export class SrcCode {
//     constructor(public code?: string,){
//         this.code = code ? code : '';
//     }
// }