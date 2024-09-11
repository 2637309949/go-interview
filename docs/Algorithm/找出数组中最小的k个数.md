要找出一个数组中最小的 `k` 个数，有多种方法可以实现。以下是几种常见的算法：

### 方法 1：排序法
这是最直接的方法。先对数组进行排序，然后取出前 `k` 个元素。

**时间复杂度**：O(n log n)，其中 `n` 是数组的长度。

**代码示例（Go语言）**：

```go
package main

import (
	"fmt"
	"sort"
)

func getLeastNumbers(arr []int, k int) []int {
	if k == 0 || len(arr) == 0 {
		return []int{}
	}

	// 排序数组
	sort.Ints(arr)

	// 取出前 k 个元素
	return arr[:k]
}

func main() {
	arr := []int{3, 2, 1, 5, 6, 4}
	k := 2
	result := getLeastNumbers(arr, k)
	fmt.Println(result) // 输出 [1, 2]
}
```

### 方法 2：最大堆（适用于处理大量数据）
可以使用一个大小为 `k` 的最大堆来保存最小的 `k` 个数。遍历数组时，维护堆的大小为 `k`，每当堆的大小超过 `k` 时，就将堆顶元素（最大值）移除。

**时间复杂度**：O(n log k)，其中 `n` 是数组的长度。

**代码示例（Go语言）**：

```go
package main

import (
	"container/heap"
	"fmt"
)

// 定义一个最大堆
type MaxHeap []int

func (h MaxHeap) Len() int            { return len(h) }
func (h MaxHeap) Less(i, j int) bool  { return h[i] > h[j] }
func (h MaxHeap) Swap(i, j int)       { h[i], h[j] = h[j], h[i] }
func (h *MaxHeap) Push(x interface{}) { *h = append(*h, x.(int)) }
func (h *MaxHeap) Pop() interface{} {
	old := *h
	n := len(old)
	x := old[n-1]
	*h = old[0 : n-1]
	return x
}

func getLeastNumbers(arr []int, k int) []int {
	if k == 0 || len(arr) == 0 {
		return []int{}
	}

	h := &MaxHeap{}
	heap.Init(h)

	// 构建最大堆
	for _, num := range arr {
		heap.Push(h, num)
		if h.Len() > k {
			heap.Pop(h)
		}
	}

	// 输出结果
	return *h
}

func main() {
	arr := []int{3, 2, 1, 5, 6, 4}
	k := 2
	result := getLeastNumbers(arr, k)
	fmt.Println(result) // 输出 [2, 1]
}
```

### 方法 3：快速选择算法（Quick Select）
这种方法是基于快速排序的思想，将数组划分为两个部分：一部分小于基准元素，另一部分大于基准元素。递归或迭代地对其中一部分继续执行此操作，直到找到第 `k` 小的元素位置。

**时间复杂度**：O(n) 平均情况，O(n²) 最坏情况。

**代码示例（Go语言）**：

```go
package main

import (
	"fmt"
)

func partition(arr []int, left, right int) int {
	pivot := arr[right]
	i := left
	for j := left; j < right; j++ {
		if arr[j] < pivot {
			arr[i], arr[j] = arr[j], arr[i]
			i++
		}
	}
	arr[i], arr[right] = arr[right], arr[i]
	return i
}

func quickSelect(arr []int, left, right, k int) {
	if left < right {
		pos := partition(arr, left, right)
		if pos == k {
			return
		} else if pos < k {
			quickSelect(arr, pos+1, right, k)
		} else {
			quickSelect(arr, left, pos-1, k)
		}
	}
}

func getLeastNumbers(arr []int, k int) []int {
	if k == 0 || len(arr) == 0 {
		return []int{}
	}
	quickSelect(arr, 0, len(arr)-1, k)
	return arr[:k]
}

func main() {
	arr := []int{3, 2, 1, 5, 6, 4}
	k := 2
	result := getLeastNumbers(arr, k)
	fmt.Println(result) // 输出 [1, 2]
}
```

### 总结
- **排序法** 适合处理较小的数据集，且简单易实现。
- **最大堆法** 适合处理大量数据，尤其是当 `k` 较小的时候。
- **快速选择法** 适合在时间复杂度上有更高要求的场景，但最坏情况下时间复杂度较高。

选择何种方法可以根据数据规模和 `k` 的大小来决定。