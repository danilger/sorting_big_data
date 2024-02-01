Описание логики приложения
Данное приложение разработано для сортировки больших файлов, содержащих строки. Оно выполняет следующие шаги:

**Создание файла для теста:**

Файл для тестирования генерируется с помощью функции GenerateTestFile.
Функция main инициализирует процесс разбиения и слияния файлов.

**Разбиение файла на части (splitFile.ts):**

Файл разбивается на части с определенным размером (partSize), по умолчанию 1 МБ.
Каждая часть сортируется построчно.
Сортированные части сохраняются в отдельные файлы, а также информация о каждой части добавляется в очередь (queue), которая представлена массивом объектов queueItem.
Функция возвращает промис, возвращающий массив объектов queueItem, представляющих отсортированные части файла.

**Слияние отсортированных файлов (mergeSortedFiles.ts):**

Функция mergeSortedFiles выполняет слияние отсортированных частей файла.
Она получает на вход массив queue, содержащий информацию о каждой части файла.
В процессе слияния происходит выборка минимальной строки из первой части в очереди и запись ее в выходной файл.
После записи минимальной строки, происходит чтение следующей строки из соответствующей части файла в очереди.
Когда часть файла исчерпывается, она удаляется из очереди.
Процесс повторяется до тех пор, пока очередь не опустеет.
Завершение программы:

После завершения всех операций приложение выводит сообщение о завершении сортировки.
Этот процесс позволяет эффективно сортировать большие файлы, не загружая оперативную память всего файла в память целиком, а оперируя лишь отдельными его частями.
