import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'myfilter',
    pure: false
})


export class MyFilterPipe implements PipeTransform {
    transform(items: any[], filter: Object): any {
 
        if (!items || !filter || !filter['name']) {
            return items;
        }
        // filter items array, items which match and return true will be
        // kept, false will be filtered out

        
        return items.filter(item => {

             let isPartNumberMatch  = false;
             let isPartNumberCodeMatch  = false;
             let isOemMatch = false;

             let isCategoryMatch=false;
             let isModelMatch = false;

             let stringData;

             if(filter['src']=='createOrder' && item.partNumber && item.partNumber != null) {
                 stringData = (item.partNumber.toString()).toLowerCase();
                 isPartNumberMatch = stringData.indexOf(filter['name'].toLowerCase()) != -1;
             }

             if(filter['src']=='createOrder' && item.oem && item.oem != null) {

                stringData = (item.oem.toString()).toLowerCase();
                isOemMatch = stringData.indexOf(filter['name'].toLowerCase()) != -1;
             }

             if(filter['src']=='orderItemModel' && item.partNumberCode && item.partNumberCode != null) {
                stringData = (item.partNumberCode.toString()).toLowerCase();
                isPartNumberCodeMatch = stringData.indexOf(filter['name'].toLowerCase()) != -1;
            }

             if(filter['src']=='orderItemModel' && item.category && item.category != null) {

                stringData = (item.category.toString()).toLowerCase();
                isCategoryMatch = stringData.indexOf(filter['name'].toLowerCase()) != -1;
             }

             if(filter['src']=='orderItemModel' && item.model && item.model != null) {

                stringData = (item.model.toString()).toLowerCase();
                isModelMatch = stringData.indexOf(filter['name'].toLowerCase()) != -1;
             }

             if(isPartNumberMatch || isPartNumberCodeMatch || isOemMatch || isCategoryMatch || isModelMatch) {
                  return true;
             } else {
                  return false;
             }
        })
    }
}