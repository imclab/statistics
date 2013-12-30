class Cms::Article < ActiveRecord::Base
  
  #GEMS USED
  self.table_name = :cms_articles
  extend FriendlyId
  friendly_id :title, use: [:slugged]
  
  #ACCESSORS
  attr_accessible :description, :is_published, :published_at, :title
  
  #ASSOCIATIONS
  #VALIDATIONS
  validate :title, uniqueness: true, length: {minimum: 2}
  validates :title, :presence => true

  
  #CALLBACKS
  before_create :before_create_set
  before_save :before_save_set
  
  #SCOPES
  #CUSTOM SCOPES
  #OTHER METHODS  
  #UPSERT
  #JOBS
  #PRIVATE
  private
  
  def before_save_set
    if self.is_published_changed?
      if self.is_published
        self.published_at = Date.today
      end
    end
    true
  end
  
  def before_create_set
    self.is_published = false if self.is_published.blank?
    true
  end
    
end
