interface WebhookPayload {
  event: string
  data: any
  timestamp: string
}

export class WebhookService {
  private webhooks: Map<string, string[]> = new Map()

  subscribe(event: string, url: string) {
    const urls = this.webhooks.get(event) || []
    urls.push(url)
    this.webhooks.set(event, urls)
  }

  async trigger(event: string, data: any) {
    const urls = this.webhooks.get(event) || []
    
    const payload: WebhookPayload = {
      event,
      data,
      timestamp: new Date().toISOString()
    }

    const promises = urls.map(url => 
      fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).catch(console.error)
    )

    await Promise.allSettled(promises)
  }

  // Monitor network conditions and trigger alerts
  async checkAlerts() {
    // Mock implementation - would integrate with real monitoring
    const tps = Math.random() * 5000
    const stablecoinRedemptions = Math.random() * 1000000
    
    if (tps < 1000) {
      await this.trigger('tps_drop', { tps, threshold: 1000 })
    }
    
    if (stablecoinRedemptions > 500000) {
      await this.trigger('high_stablecoin_redemptions', { 
        amount: stablecoinRedemptions,
        threshold: 500000 
      })
    }
  }
}

export const webhookService = new WebhookService()