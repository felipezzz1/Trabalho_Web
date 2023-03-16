import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddOrderIdToOrdersCar1678899761739 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'orders_cars',
            new TableColumn({
              name: 'order_id',
              type: 'uuid',
              isNullable: true,
            }),
          );
    
          await queryRunner.createForeignKey('orders_cars',
            new TableForeignKey({
              name: 'OrdersCarsOrders',
              columnNames: ['order_id'],
              referencedTableName: 'orders',
              referencedColumnNames: ['id'],
              onDelete: 'SET NULL',
            })
          );
        }
    
        public async down(queryRunner: QueryRunner): Promise<void> {
          await queryRunner.dropForeignKey('orders_cars', 'OrdersCarsOrders');
          await queryRunner.dropColumn('orders_cars', 'order_id');
        }
  

}
