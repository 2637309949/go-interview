`WHERE` 和 `HAVING` 都是用于过滤数据的 SQL 子句，但它们的应用场景和工作方式有所不同：

### 1. **`WHERE` 子句**
   - **作用**：`WHERE` 用于过滤**行数据**，在数据库检索数据时先执行`WHERE`子句的过滤。
   - **位置**：它出现在 `SELECT`、`UPDATE`、`DELETE` 语句中的数据提取阶段，在执行聚合函数（如 `COUNT()`、`SUM()`）之前进行过滤。
   - **使用场景**：`WHERE` 子句通常用于直接过滤列数据，不能用于过滤聚合后的结果。
   - **示例**：
     ```sql
     SELECT * FROM employees
     WHERE salary > 50000;
     ```
     此查询会过滤出 `salary` 大于 50000 的行数据。

### 2. **`HAVING` 子句**
   - **作用**：`HAVING` 用于过滤**聚合结果**，它在执行 `GROUP BY` 之后才进行过滤，主要用于聚合后的条件筛选。
   - **位置**：`HAVING` 子句必须出现在 `GROUP BY` 子句之后，用于过滤分组或聚合后的数据。
   - **使用场景**：`HAVING` 通常与聚合函数（如 `COUNT()`、`SUM()`）配合使用，过滤已经通过 `GROUP BY` 产生的分组结果。
   - **示例**：
     ```sql
     SELECT department, COUNT(*)
     FROM employees
     GROUP BY department
     HAVING COUNT(*) > 5;
     ```
     此查询会先按 `department` 分组，然后筛选出员工数量大于 5 的部门。

### 区别总结：
- **处理时机**：
  - `WHERE` 在 `GROUP BY` 和聚合运算**之前**应用，过滤行数据。
  - `HAVING` 在 `GROUP BY` 和聚合运算**之后**应用，过滤分组或聚合结果。

- **使用限制**：
  - `WHERE` 不能用来过滤聚合函数的结果。
  - `HAVING` 可以使用聚合函数（例如 `COUNT`、`SUM`、`AVG`）。

### 例子对比：
假设我们有一个 `sales` 表，结构如下：
```sql
| id | product  | category | amount |
|----|----------|----------|--------|
| 1  | Apple    | Fruit    | 100    |
| 2  | Banana   | Fruit    | 50     |
| 3  | Carrot   | Vegetable| 200    |
| 4  | Lettuce  | Vegetable| 150    |
```

#### 使用 `WHERE`：
```sql
SELECT product, amount 
FROM sales 
WHERE amount > 100;
```
- 输出：这将筛选出 `amount` 大于 100 的行，即 Carrot 和 Lettuce。

#### 使用 `HAVING`：
```sql
SELECT category, SUM(amount) 
FROM sales 
GROUP BY category 
HAVING SUM(amount) > 150;
```
- 输出：这将先按 `category` 分组，并计算每个类别的销售总额，然后筛选出总销售额大于 150 的类别。