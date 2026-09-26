# store (Pinia) для цієї сторінки — окремий модуль, без мутації state в обхід actions

оцей модуль я не робив, по суті я розширив useProductsStore, як на мене не дуже треба друга стра не потрібна

це та сама сутность-модель-схема  (кому як довбодоби називати) Product

але йдуть на 2 сторінкі products і low-stock

можно звісно так обертку useLowStockProducts  і в ній юзати 
useProductsStore();
useGroupsStore();

