import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

// Tipo genérico: aceita qualquer lista de objetos
export async function exportarParaExcel<T extends Record<string, any>>(
    dados: T[],
    nomeArquivo: string,
    nomePlanilha: string = 'Planilha'
): Promise<void> {

    if (!dados || dados.length === 0) {
        console.warn('Nenhum dado para exportar');
        return;
    }

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(nomePlanilha);

    // Definição das colunas baseado nas keys do primeiro item
    const colunas = Object.keys(dados[0]).map((chave) => ({
        header: chave,
        key: chave,
        width: 30,
    })) as ExcelJS.Column[];

    worksheet.columns = colunas;

    // Estilizar cabeçalhos
    colunas.forEach((_, index) => {
        const cell = worksheet.getRow(1).getCell(index + 1);

        cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FF37474F' },
        };

        cell.font = {
            color: { argb: 'FFFFFFFF' },
            bold: true,
        };

        cell.alignment = { vertical: 'middle', horizontal: 'center' };

        cell.border = {
            top:    { style: 'thin' },
            bottom: { style: 'thin' },
            left:   { style: 'thin' },
            right:  { style: 'thin' },
        };
    });

    // Adiciona dados ao Excel
    dados.forEach((linha) => {
        worksheet.addRow(linha);
    });

    // Gera o arquivo e baixa
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });

    saveAs(blob, `${nomeArquivo}.xlsx`);
}
