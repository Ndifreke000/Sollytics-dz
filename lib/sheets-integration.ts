export class SheetsIntegration {
  generateGoogleSheetsFormula(metric: string) {
    const baseUrl = 'https://your-domain.com/api/metrics'
    
    const formulas = {
      'solana_tps': `=IMPORTDATA("${baseUrl}/solana/tps")`,
      'usdc_supply': `=IMPORTDATA("${baseUrl}/stablecoins/usdc/supply")`,
      'usdt_supply': `=IMPORTDATA("${baseUrl}/stablecoins/usdt/supply")`,
      'network_health': `=IMPORTDATA("${baseUrl}/network/health")`,
      'validator_count': `=IMPORTDATA("${baseUrl}/validators/count")`
    }
    
    return formulas[metric as keyof typeof formulas] || `=IMPORTDATA("${baseUrl}/${metric}")`
  }

  generateExcelTemplate() {
    return {
      name: 'Solana Analytics Template',
      sheets: [
        {
          name: 'Network Metrics',
          columns: ['Timestamp', 'TPS', 'Block Time', 'Network Load'],
          formulas: [
            'A2: =NOW()',
            'B2: =WEBSERVICE("https://your-domain.com/api/metrics/tps")',
            'C2: =WEBSERVICE("https://your-domain.com/api/metrics/block-time")',
            'D2: =WEBSERVICE("https://your-domain.com/api/metrics/network-load")'
          ]
        },
        {
          name: 'Stablecoins',
          columns: ['Token', 'Supply', 'Change 24h', 'Market Cap'],
          data: [
            ['USDC', '=WEBSERVICE("https://your-domain.com/api/metrics/stablecoins/usdc")', '', ''],
            ['USDT', '=WEBSERVICE("https://your-domain.com/api/metrics/stablecoins/usdt")', '', '']
          ]
        }
      ]
    }
  }

  generateCSVExport(data: any[]) {
    if (!data.length) return ''
    
    const headers = Object.keys(data[0])
    const rows = data.map(row => 
      headers.map(header => 
        typeof row[header] === 'string' && row[header].includes(',') 
          ? `"${row[header]}"` 
          : row[header]
      ).join(',')
    )
    
    return [headers.join(','), ...rows].join('\n')
  }
}

export const sheetsIntegration = new SheetsIntegration()